import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

interface CallEvent {
  eventType: string;
  callData: any;
}

type Props = {};

const username = "HNIDA19225724";
const password = "oK44KJLj4mb5";
const domain = "hnida19225724.oncall";
const URL_API = "https://rsv01.oncall.vn:8887/api";

type MakeCallProps = {
  caller: string;
  callee: string;
  extensionNumber: string;
};

type CallQueuesProps = {
  id?: string;
  type?: "agents" | "waiting";
  agentNumber?: string;
  status?:
    | "READY"
    | "NOT_READY"
    | "WRAP_UP"
    | "BREAK"
    | "LUNCH"
    | "LOGGED_IN"
    | "LOGGED_OUT";
};

type GeneralProps = {
  id?: string;
};

type RecordProps = GeneralProps & {
  responseType?: "arraybuffer" | "blob" | "document" | "formdata" | "json" | "stream" | "text";
}

type CallHistoryProps = GeneralProps & {
  startedAt?: string;
  endedAt?: string;
}

type ContactGroupProps = {
  id?: string;
};

type UserGroupProps = ContactGroupProps;

type UsersAndExtensionsProps = ContactGroupProps & {
  type?: "balance" | "status";
};

const useOnCall = ({}: Props = {}) => {
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const unSub = async () => {
      const data = await getToken(username, password);
      console.log({ data });

      setToken(data.access_token);
    };

    unSub();
  }, []);

  // 1. Get token
  const getToken = async (username: string, password: string) => {
    try {
      let data = {
        username: username,
        password: password,
        domain: domain,
      };
      const response = await axios.post(`${URL_API}/tokens`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Xử lý phản hồi từ API ở đây (response.data)
      return response.data; // Trả về dữ liệu từ API (hoặc có thể là phần xử lý dữ liệu nếu cần)
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log("Error:", error.response.data);
        return error.response.data;
      } else {
        console.error("Unknown Error:", error);
        throw error;
      }
    }
  };

  // 1.2. Get token by extension
  const getTokenByExtension = async (extension: string, password: string) => {
    try {
      let data = {
        extension_number: extension,
        password: password,
        domain: "hnida1922test.oncall",
      };
      console.log(data);
      const response = await axios.post(
        `${URL_API}/tokens/by_extension`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Xử lý phản hồi từ API ở đây (response.data)
      return response.data; // Trả về dữ liệu từ API (hoặc có thể là phần xử lý dữ liệu nếu cần)
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log("Error:", error.response.data);
        return error.response.data;
      } else {
        console.error("Unknown Error:", error);
        throw error;
      }
    }
  };

  // 2. Get User Group
  const getUserGroup = async ({ id }: UserGroupProps = {}) => {
    if (!token) return;
    let url = `${URL_API}/groups`;

    if (id) {
      url = `${url}/${id}/members`;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      // Xử lý phản hồi từ API ở đây (response.data)
      return response.data; // Trả về dữ liệu từ API (hoặc có thể là phần xử lý dữ liệu nếu cần)
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log("Error:", error.response.data);
        return error.response.data;
      } else {
        console.error("Unknown Error:", error);
        throw error;
      }
    }
  };

  // 2.2. get Extention
  const getUsersAndExtensions = async ({
    id,
    type,
  }: UsersAndExtensionsProps = {}) => {
    if (!token) return;
    let url = `${URL_API}/users`;

    if (id) {
      url = `${url}/${id}`;

      if (type) {
        url = `${url}/${type}`;
      }
    }

    try {
      const response = await axios.get(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err: any) {
      setError(err.message);
    }
  };

  // 2.3. Get details user
  const fetchUserDetails = async (userId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${URL_API}/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // 3. THỰC HIỆN CUỘC GỌI RA TỪ MỘT EXTENSION
  const makeCall = async ({
    callee = "",
    caller = "",
    extensionNumber = "",
  }: MakeCallProps) => {
    if (!token) return;

    try {
      const response = await axios.get(
        `${URL_API}/sessions/directly?caller=${caller}&callee=${callee}&domain=${domain}&extension_number=${extensionNumber}&password=${password}&sendsdp=true&send_sdp=true`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleMakeCalling = () => {
    if(!token) return;

    const ws = new WebSocket(`wss://rsv01.oncall.vn:8887/ws?token=${token}`);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event_type === 'call_cancelled') {
        console.log('Call cancelled:', data);
        // Xử lý sự kiện hủy cuộc gọi ở đây
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }

  // 4. LẤY THÔNG TIN FILE GHI ÂM CỦA CUỘC GỌI
  const getCallRecording = async ({ id = "", responseType = 'json' }: RecordProps = {}) => {
    if (!token) return;

    let url = `${URL_API}/recordings`;

    if (id) {
      url = `${url}/${id}`;
    }

    try {
      const response = await axios.get(url, {
        responseType: responseType,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err: any) {
      setError(err.message);
    }
  };

  // 5. API LẤY THÔNG TIN LỊCH SỬ CUỘC GỌI
  const getCallHistory = async ({
    id = '',
    startedAt = '',
    endedAt = '',
  }: CallHistoryProps = {}) => {
    if (!token) return;

    let url = `${URL_API}/cdrs`;

    const p = `2024-06-05T17:00:00Z`;
    if (id) {
      url = `${url}/${id}`;
    } else if (startedAt && endedAt) {
      const filter=`started_at gt '${startedAt}' and started_at lt '${endedAt}'`;
      url = `${url}?filter=${filter}`;
    }
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err: any) {
      setError(err.message);
    }
  };

  // 6. API LẤY THÔNG TIN LIÊN QUAN ĐẾN CALL QUEUE
  const callQueues = async ({
    id,
    type,
    agentNumber,
    status,
  }: CallQueuesProps = {}) => {
    if (!token) return;

    let url = `${URL_API}/call_queues`;

    if (id) {
      console.log({id});
      
      url = `${url}/${id}`;
      if (type) {
        url = `${url}/${type}`;
        if (agentNumber) {
          url = `${url}/${agentNumber}`;
        }
      }
    }

    try {
      if (status) {
        const data = {
          status,
        };
        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } else {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // 7. API LẤY THÔNG TIN LIÊN QUAN ĐẾN CONTACT
  const getContactGroup = async ({ id }: ContactGroupProps = {}) => {
    if (!token) return;

    let url = `${URL_API}/contact_groups`;

    if (id) {
      console.log("111231231231");
      
      url = `${url}/${id}/contacts`;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    getToken,
    getTokenByExtension,
    token,
    getUserGroup,
    getUsersAndExtensions,
    fetchUserDetails,
    makeCall,
    callQueues,
    getContactGroup,
    getCallRecording,
    getCallHistory,
    handleMakeCalling,
    error,
  };
};

export default useOnCall;


const convertDataHistories = (data: any[]) => {
  const dataHistories = [...data];
  return dataHistories.map(item => {
    const time = dayjs(item.ended_at - item.started_at).format("mm:ss");
    console.log(time);
    
    return item;
  });


}
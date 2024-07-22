"use client";

import { KDialog } from "@/components/ui";
import KAutoComplate from "@/components/ui/KAutoComplate";
import KInput from "@/components/ui/KInput";
import useOnCall from "@/hooks/call-fpt/useOnCall";
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {};

const BASE_URL = "https://rsv01.oncall.vn:8887";

const DashboardPage = (props: Props) => {
  // const {
  //   token,
  //   getUsersAndExtensions,
  //   getCallRecording,
  //   getCallHistory,
  //   callQueues,
  //   getContactGroup,
  //   makeCall,
  //   handleMakeCalling,
  // } = useOnCall();
  // const [extentions, setExtentions] = useState<any[]>([]);
  // const [records, setRecords] = useState<any[]>([]);
  // const [queues, setQueues] = useState<any[]>([]);
  // const [histories, setHistories] = useState<any[]>([]);
  // const [audioSrc, setAudioSrc] = useState<string | null>(null);
  // const [open, setOpen] = useState<boolean>(false);
  // const [phone, setPhone] = useState<string>('');

  // const [record, setRecord] = useState<any>();

  // useEffect(() => {
  //   if (!token) return;
  //   const unSub = async () => {
  //     const data = await getUsersAndExtensions();
  //     const records = await getCallRecording();
  //     const callHistories = await getCallHistory({
  //       // startedAt: "2024-07-06T17:00:00Z",
  //       // endedAt: "2024-07-08T17:00:00Z",
  //     });

  //     const contacts = await getContactGroup({ id: "862544585518219264" });

  //     setHistories(callHistories.items);

  //     const data3 = await callQueues({});
  //     console.log({ data, records, data3, contacts, callHistories });
  //     setRecords(records.items);
  //     setExtentions(data.items);
  //     setQueues(data3.items);
  //   };
  //   unSub();
  // }, [token]);

  // const handleGetExtensions = async (id: string) => {
  //   const data = await getUsersAndExtensions({ id });
  //   const balance = await getUsersAndExtensions({ id, type: "balance" });
  //   const status = await getUsersAndExtensions({ id, type: "status" });

  //   console.log({ data, balance, status });
  // };

  // const handleGetDetailsRecord = async (id: string) => {
  //   setRecord(null);
  //   const data = await getCallRecording({ id });
  //   const data2 = await getCallHistory({ id });
  //   console.log({ data, data2 });
  //   setRecord({ ...data.items[0] });
  // };

  // const handleGetDetailHistory = async (id: string) => {
  //   setRecord(null);
  //   const data = await getCallHistory({ id });
  //   const data2 = await getCallRecording({ id });

  //   console.log({ data2 });
  //   setRecord({ ...data2.items[0] });

  //   setOpen(true);
  //   // const url = URL.createObjectURL(data2);

  //   // setAudioSrc(url);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   setRecord(null);
  // };

  // const handleMakeCall = async () => {
  //   if (!phone) {
  //     alert('Please input phone number');
  //     return;
  //   }
  //   const abc = await makeCall({
  //     callee: "105",
  //     caller: phone,
  //     extensionNumber: "105",
  //   });
  //   console.log({ abc });
  // };

  return (
    <div>
      <KAutoComplate type="" name="hamo" />
      {/* <h2>Queues</h2>
      <KInput type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      <Button onClick={handleMakeCall}>momo</Button>
      <ul>
        {queues.map((item, index) => (
          <li key={item.id}>
            <Button onClick={() => handleGetDetailHistory(item.id)}>
              {index + 1} - {item.id}
            </Button>
            <span className="m-0">{item.name} </span> -
            <span className="m-0"> {item.extension_number}</span>
          </li>
        ))}
      </ul>
      <h2>Extentions</h2>
      <ul>
        {extentions.map((item, index) => (
          <li key={item.id}>
            <Button onClick={() => handleGetExtensions(item.id)}>
              {index + 1} - {item.id}
            </Button>
            <span className="m-0">{item.extension_number} </span>
            <span className="m-0"> {item.email}</span>
          </li>
        ))}
      </ul>
      <h2>Records</h2>
      <ul>
        {records.map((item, index) => (
          <li key={item.id}>
            <Button onClick={() => handleGetDetailsRecord(item.id)}>
              {index + 1} - {item.id}
            </Button>
            <span className="m-0">{item.caller} </span> -
            <span className="m-0"> {item.callee}</span>
          </li>
        ))}
      </ul>
      <h2>Histories</h2>
      <ul>
        <li></li>
        {histories.map((item, index) => (
          <li key={item.id}>
            <Button onClick={() => handleGetDetailHistory(item.id)}>
              {index + 1} - {item.id}
            </Button>
            <span className="m-0">{item.caller} </span> -
            <span className="m-0"> {item.callee}</span> -{" "}
            <span>
              {item.direction === "OUTBOUND_CALL" ? "Gọi đi" : "Gọi đến"}
            </span>
          </li>
        ))}
      </ul>
      <KDialog title="Patient" size="sm" open={open} onClose={handleClose}>
        {record && (
          <audio controls>
            <source src={BASE_URL + record.file_url} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        )}
      </KDialog> */}
    </div>
  );
};

export default DashboardPage;

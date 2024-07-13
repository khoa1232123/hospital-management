import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Giả lập gửi thông báo sau 5 giây
  setTimeout(() => {
    const event = {
      event_type: "cdr_target_answer",
      caller: "0123456789",
      destination: "0987654321",
      time: new Date().toISOString(),
    };
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  }, 5000);

  // Đóng kết nối sau khi gửi
  req.on("close", () => {
    res.end();
  });
};

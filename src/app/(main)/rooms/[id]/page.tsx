"use client";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const RoomSinglePage = (props: Props) => {
  const { id } = useParams();

  console.log({ id });

  return <div>hello</div>;
};

export default RoomSinglePage;

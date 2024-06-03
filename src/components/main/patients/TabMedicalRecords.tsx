import React from "react";

type Props = {
  id?: string;
};

const TabMedicalRecords = ({ id = "hellooooo" }: Props) => {
  return <div>{id}</div>;
};

export default TabMedicalRecords;

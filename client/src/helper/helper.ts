import axios from "axios";
import fetchURL from "./apihandler";
import { attributes } from "lib/Types";

const baseURL = "http://localhost:5000";

export const createTable = async (
  enitityName: string,
  attributes: attributes
) => {
  const requestBody: any = {
    enitityName: enitityName,
    attributes: attributes,
  };

  try {
    const response = await axios.post(
      `${baseURL}/api/createtable`,
      requestBody
    );
    // console.log("response2", response);

    return response;
  } catch (error) {
    console.log("error", error);
  }
  // const response =  await fetchURL(c , "post" ,requestBody  )
};

export const getTables = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/gettables`);

    const data = response.data.data;

    const keyName = Object.keys(data[0])[0];

    const tableNames = data.map((item: any) => item[keyName]);

    // console.log("tableNames", tableNames);
    return tableNames;
  } catch (error) {
    console.log(error);
  }
};

export const getTablesAttributes = async (tablename: string) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/getAttributes/${tablename}`
    );

    console.log("table attributes", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addDataTotable = async (tablename: string, Insertiondata: any) => {
  try {
    const response = await axios.post(`${baseURL}/api/insertdata`, {
      tablename,
      Insertiondata,
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const gettableData = async (tablename: string) => {
  try {
    const response = await axios.get(`${baseURL}/api/getdata/${tablename}`);

    console.log("gettableData", response.data.data);

    return response.data.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const deletetableData = async (tablename: string, id: number) => {
  try {
    console.log({ tablename, id });

    const response = await axios.delete(
      `${baseURL}/api/deletedata/${tablename}/${id}`
    );

    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const updatetableData = async (
  tablename: string,
  id: number,
  data: any
) => {
  try {
    const response = await axios.put(
      `${baseURL}/api/updatedata/${tablename}/${id}`,
      data
    );
  } catch (error) {
    console.log("error", error);
  }
};

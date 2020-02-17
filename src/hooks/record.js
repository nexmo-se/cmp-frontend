import FetchAPI from "api/fetch";

function useRecord(token){

  async function createBatch(records){
    const jsonRecords = records.map((record) => record.toJSON());
    console.log(JSON.stringify(jsonRecords));
    const url = `${process.env.REACT_APP_BASE_API_URL}/records/batch`;
    await FetchAPI.post(url, token, JSON.stringify(jsonRecords));
  }

  return { createBatch }
}
export default useRecord;
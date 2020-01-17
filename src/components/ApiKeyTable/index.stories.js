import React from "react";

import ApiKeyTable from "components/ApiKeyTable";

export default { 
  title: "components/ApiKeyTable",
  component: ApiKeyTable
}

const data = [
  { 
    id: "80653b38-5783-4093-abf7-e304436dba50",
    name: "Main Key",
    key: "056344dd",
    applications: [{}, {}],
    channels: [{}],
    users: []
  }
]

export const Default = () => <ApiKeyTable data={data}/>

Default.story = { name: "default" }
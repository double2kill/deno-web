import { Client } from "https://deno.land/x/mysql/mod.ts";
const client = await new Client().connect({
  hostname: "132.232.0.149",
  username: "Mikelian",
  db: "zzblogo",
  password: "123456",
});

const users = await client.query(
  `SELECT sql_calc_found_rows SN FROM ml_switch WHERE Test_Station='总检' AND Test_Require='以管理板为主' AND Product_Model='S5750-24GT8SFP-P' ORDER BY Record_Time DESC limit 0,50`,
);
console.log(users);

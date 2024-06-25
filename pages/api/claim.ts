import { supabase } from "@/lib/supabase";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { uid, address, chain } = req.body;
      const { data, error } = await supabase
        .from("tips")
        .select("*")
        .eq("claim_uid", uid);
      if (!error && data.length > 0) {
        try {
          const { data: updateData, error } = await supabase
            .from("tips")
            .update({
              ...data[0],
              claimed: true,
              recipient_address: address,
              receiver_hash: data[0]?.sender_hash ?? "0x0",
            })
            .eq("claim_uid", uid);
          console.log("ERROR ", error, updateData);
          if (error) res.status(400).json({ error });
          return res.status(200).send({ hash: data[0].sender_hash ?? "0x0" });
        } catch (e) {
          res.status(200).json({ error: e });
        }
      }
    } catch (e) {
        console.log("ERROR ", e);
      res.status(400).json({ error: e });
    }
  } else {
    return res.status(400).send("Invalid Method");
  }
};

export default handler;

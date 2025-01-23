// import { NextApiRequest, NextApiResponse } from "next";
// import { db } from "@/lib/db";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const { type } = req.body;
//     try {
//       await db.user.update({
//         where: { id: req.session.userId },
//         data: { profileType: type },
//       });
//       res.status(200).json({ message: "Profile type saved successfully" });
//     } catch (error) {
//       console.error("Error saving profile type:", error);
//       res.status(500).json({ error: "Failed to save profile type" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

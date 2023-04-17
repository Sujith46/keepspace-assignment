// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { contact } from "@/constants/contact";

export default function handler(req, res) {
  res.status(200).json(contact);
}

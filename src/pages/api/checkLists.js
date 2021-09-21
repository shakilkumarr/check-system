const DEFAULT_CHECK_LIST = [{
  id: "aaa",
  priority: 10,
  description: "Face on the picture matches face on the document"
},
{
  id: "bbb",
  priority: 5,
  description: "Veriff supports presented document"
},
{
  id: "ccc",
  priority: 7,
  description: "Face is clearly visible"
},
{
  id: "ddd",
  priority: 3,
  description: "Document data is clearly visible"
}];

export default function handler(req, res) {
  const responseToSend = req.method === 'POST' ? req.body : DEFAULT_CHECK_LIST;
  if (Math.random() <= 0.8) res.status(200).send({ checkList: responseToSend })
  else res.status(500).send({ message: 'Internal Server Error. Please Try Again' })
}
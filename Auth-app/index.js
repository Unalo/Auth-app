import http from "http";
import app from "./app.js";
const server = http.createServer(app);


const { API_PORT, MONGO_URL } = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});






// const checkToken = (req, res, next) => {
//     const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
//     console.log(req.headers.authorization);
//     console.log(token);

//     if (!req.headers.authorization || !token) {
//         res.sendStatus(401);
//         return;
//     }
//     console.log(jwt.verify(token, 'thisIsMySecret@1995'));
//     // const decoded = jwt.verify(token, 'thisIsMySecret@1995');
//     // const { username } = decoded
//     // console.log(username);
//     next();
// };
// app.post('/api/sign-up', (req, res) => {
//     let { name, username, password } = req.body

//     console.log({ name, username, password });

//     if (name && username && password) {

//         const token = jwt.sign({
//             username
//         }, 'thisIsMySecret@1995');

//         res.json({
//             message: "Sucess",
//             token: token
//         })
//     } else {
//         res.sendStatus(400);
//     }
// })


// app.get('/api/name', checkToken, (req, res) => {
//     res.json({
//         name: "Ta tso"
//     })
// });


// // app.listen(8000, () => {
// //     console.log("Api started at port 8000");
// // })
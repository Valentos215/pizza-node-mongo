import app from "./app";
const port = process.env.PORT || 9001;

app.listen(port, () => console.log(`Server has been started at port ${port}.`));

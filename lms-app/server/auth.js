import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    console.log("at try");
    const token = req.headers.authorization.split(" ")[1];
    console.log("token is:" + token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    const { id, name, photoURL, role } = decodedToken;
    req.user = { id, name, photoURL, role };

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Something is wrong with your authorization!",
    });
  }
};

export default auth;

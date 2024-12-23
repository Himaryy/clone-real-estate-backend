import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // Get the token from the cookies
    const token = req.cookies.token;

    // If no token, return a 401 Unauthorized error
    if (!token) {
      return res.status(401).json({ message: "Not Authenticated!" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid!" });
      }

      // Attach the user ID to the request object
      req.userId = payload.id;

      // Pass control to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error("Error in verifyToken middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

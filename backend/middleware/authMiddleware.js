const jwt = require("jsonwebtoken");

// ================= PROTECT (VERIFY TOKEN) =================
const protect = (req, res, next) => {
  try {
    let token;

    // Check token in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};

// ================= ROLE: RECRUITER =================
const isRecruiter = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res
      .status(403)
      .json({ message: "Access denied. Recruiters only" });
  }
  next();
};

// ================= ROLE: JOB SEEKER =================
const isJobSeeker = (req, res, next) => {
  if (req.user.role !== "jobseeker") {
    return res
      .status(403)
      .json({ message: "Access denied. Job seekers only" });
  }
  next();
};

// ✅ SINGLE EXPORT (IMPORTANT)
module.exports = { protect, isRecruiter, isJobSeeker };
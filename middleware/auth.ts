import jwt from 'next-auth/jwt'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any, next: any) => {
  const token = await jwt.getToken({ req, secret: process.env.JWT_SECRET })

  if (token) {
    // Signed in
    req.user = token
    next()
  } else {
    // Not Signed in
    res.status(401)
    res.end()
  }
}

import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d' // 15d
  })

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS // 15d
    httpOnly: true, // предотвращение XSS-атак с использованием межсайтовых сценариев
    sameSite: 'strict', // CSRF-атаки, атаки с подделкой межсайтовых запросов
    secure: process.env.NODE_ENV !== 'development'
  })
}

export default generateTokenAndSetCookie

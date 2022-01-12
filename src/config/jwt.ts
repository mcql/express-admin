const jwt = {
  secret: 'test',
  expiresIn: 3600,
  whiteUrl: ['/api/login', '/api/menu/list']
}

export default jwt

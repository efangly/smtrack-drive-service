type TokenType = {
  id: string
  role: UserRole
  hosId: string
  wardId: string
  iat: number
  exp: number
}

type UserType = {
  display: string
  id: string
  pic: string
  role: string
  status: boolean
  username: string
  ward: {
    hospital: {
      hosName: string
      hosPic: string
      id: string
    }
    id: string
    wardName: string
  }
}

enum UserRole {
  SUPER = 'SUPER',
  SERVICE = 'SERVICE',
  ADMIN = 'ADMIN',
  USER = 'USER',
  LEGACY_ADMIN = 'LEGACY_ADMIN',
  LEGACY_USER = 'LEGACY_USER',
  GUEST = 'GUEST'
}

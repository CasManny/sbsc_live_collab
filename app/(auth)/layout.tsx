type Props = {
    children: React.ReactNode
}
const AuthLayout = ({children}: Props) => {
    return (
        <main className="min-h-screen flex items-center justify-center">
            {children}
      </main>
  )
}

export default AuthLayout
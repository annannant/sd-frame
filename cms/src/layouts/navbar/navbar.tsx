import { Container } from './navbar.styles'

export const Navbar = () => {
  return (
    <Container className="z-10 flex justify-between shadow-sm shadow-bg-dark2/50">
      <div className="flex items-center text-xl font-semibold tracking-[8px] text-font-dark-base">
        SDFRAME
      </div>
      <div className="flex-1"></div>
      <div className="">xx</div>
    </Container>
  )
}

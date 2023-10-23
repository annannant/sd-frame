import { Container } from './navbar.styles'

export const Navbar = () => {
  return (
    <Container className="z-10 flex justify-between shadow-sm shadow-bg-dark2/50">
      <div className="flex items-center text-xl font-semibold tracking-[8px] ">
        SDFRAME
      </div>
      <div className="flex-1"></div>
      <div className="flex items-center">
        <div className="h-[25px] w-[25px] rounded-full	bg-white "></div>
        <div className="ml-[15px]">
          <div className="text-[12px]">Barami,</div>
          <div className="text-dark-font-nuetral text-[10px] leading-none">
            Production
          </div>
        </div>
      </div>
    </Container>
  )
}

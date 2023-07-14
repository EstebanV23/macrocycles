import BackgroundTop from '../backgroundTop/BackgroundTop'
import ContainerForm from '../containerForm/ContainerForm'

export default function FormsContainer ({ children, title }) {
  return (
    <BackgroundTop>
      <ContainerForm title={title}>
        {children}
      </ContainerForm>
    </BackgroundTop>
  )
}

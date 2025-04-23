
import { Input } from '../../../../../../components/ui/input'



const index = ({id,name,type,placeHolder}) => {

  return (
    <>
    <Input className='placeholder:text-gray-700 border-gray-700 text-gray-700'
     id={id} name={name} type={type} placeholder={placeHolder}  required/>
    </>

  )
}

export default index
import { ChakraProvider,Heading,Container,Text,Input,Button, Wrap,Image,Link,SkeletonCircle,SkeletonText,Stack,useColorMode,useColorModeValue} from '@chakra-ui/react'
import axios from "axios"
import { useState } from 'react'


const App = () => 
{
    const [image,updateImage]= useState()
    const [prompt1,updatePrompt]= useState()
    const [loading, updateLoading] = useState()
    const { colorMode, toggleColorMode } = useColorMode()

    
    const generate = async prompt => {
        updateLoading(true)
        const result =await axios.get(`http://127.0.0.1:8000/?prompt=${prompt1}`)
        updateImage(result.data)
        updateLoading(false)
    }
    return (
      
        
        <ChakraProvider>
            <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
            <Container>
            <Heading>Stable Diffusion Search🤖</Heading>
            <Text as='i' marginBottom={"20px"}>
          This react application leverages the model trained by Stability AI and
          Runway ML to generate images using the Stable Diffusion Deep Learning
          model. The model can be found via github {" "}
          <Link href={"https://github.com/CompVis/stable-diffusion"}>
            <u>Here</u>
          </Link> 
          . Stable Diffusion is a deep learning, text-to-image model released in 2022. It is primarily used to generate detailed images conditioned on text descriptions, though it can also be applied to other tasks such as inpainting, outpainting, and generating image-to-image translations guided by a text prompt.
        </Text>
            <Wrap marginBottom={"20px"}>
                <Input value={prompt1} onChange={e => updatePrompt(e.target.value)} width={"350px"}></Input>
                <Button onClick={e => generate(prompt1)} colorScheme={"linkedin"}>Generate Image</Button>
            </Wrap>
            {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? <Image src={`data:image/png;base64,${image}`} boxShadow="lg"/> : null}
            </Container>    
        </ChakraProvider>
    )
}

export default App
# LetMeAsk

## Notes
- To use SASS:
  ```shell
  # use version 5 not 6
  $ yarn add node-sass@^5.0.0
  ```

- Use @font-face. Download and copy configuration from [this site](https://google-webfonts-helper.herokuapp.com/fonts)

- Remember: React exposes `ButtonHTMLAttributes`, you can use it in your types.
  ```ts
  import {ButtonHTMLAttributes, ReactNode} from 'react'

  type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
  }
  ```

- CSS not: 
  ```scss
  &:not(:disabled):hover {
    filter: brightness(0.9);
  }
  ```

- Navigate using `useHistory`
  ```ts
  import {useHistory} from 'react-router-dom'

  export function SomeComponent() {
    const history = useHistory()
    
    function navigateTo() {
      history.push('/')
    }

    return <button onClick={navigateTo}>navigate</button>
  }
  ```

- Navigate using `Link`
  ```ts
  import {Link} from 'react-router-dom'

  <Link to="/">navigate</Link>
  ```

- ContextAPI
  ```ts
  // SomeComponent.tsx
  import {createConctext} from 'react'

  export const SomeContext = createContext({})

  function SomeComponent() {
    const [value, setValue] = useState('Context value')
    return (
      <SomeContext.Provider value={{value, setValue}}>
        <MagicComponent />
      </SomeContext.Provider>
    )
  }
  ```

  ```ts
  // MagicComponent.tsx
  import {useContext} from 'react' 
  import {SomeContext} from './SomeComponent'


  function MagicComponent() {
    const {value, setValue} = useContext(SomeContext)
    return (
      {/*value will be `Context value`*/}
      <h1>{value}</h1>
    )
  }
  ```

  - Switch from `react-router-dom` prevents two routes from beign called at the same time.
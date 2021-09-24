export default function Component(props) {
  console.log(props.pageContext)
  if (props.pageContext.hasError) {
    return `yo ${window.foo}`
  } else {
    return `yo`
  }
}

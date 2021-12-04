export default {
  render () {
    const styObj = {
      fontSize: '22px',
      border: '1px solid #333'
    }
    return (
      <div style={[{ color: '#f60' }, styObj]}>这是JSX语法的测试</div>
    )
  }
}

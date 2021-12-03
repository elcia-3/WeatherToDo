export default function Content({ children }) {
    return (
      <>
      <div className="container">
        { children }
       </div>
       <hr />
       <footer>©︎ 2021 ともすた</footer>
       </>
    )
}
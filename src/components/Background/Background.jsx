import "./Background.modules.css"

const Background = (props) => {
    return (
        <div>
            <div className="bgimg">

                <div className="content">
                    <h1>{props.content}</h1>
                </div>
            </div>
        </div>
    )
}

export default Background
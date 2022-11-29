import "./home.css"
import Login from "./login";
import Register from "./register";

const Home = (props)=>{
    function invokeToggler(){
        const toggler = document.querySelector(".toggle");
        console.log("toggling")
        if(toggler.classList.contains('active')){
            toggler.classList.remove('active');
        }
        else{
            toggler.classList.add("active");
        }
    }
    return (
        <div className="mt-24">
            <div className="container_home">
            <div className="card_home" />
            <div className="card_home glass p-12 rounded-xl">
            <h1 className="title">Login</h1>
            <form>
                <div className="input-container_home">
                <input type="#{type}" id="#{label}" required="required" />
                <label htmlFor="#{label}">Username</label>
                <div className="bar" />
                </div>
                <div className="input-container_home">
                <input type="#{type}" id="#{label}" required="required" />
                <label htmlFor="#{label}">Password</label>
                <div className="bar" />
                </div>
                <div className="button-container_home">
                <button>
                    <span>Go</span>
                </button>
                </div>
            </form>
            </div>
            <div className="card_home alt">
            <div className="toggle" onClick={invokeToggler} />
            <h1 className="title">
                Register
                <div className="close" onClick={invokeToggler} />
            </h1>
            <form>
                <div className="input-container_home">
                <input type="#{type}" id="#{label}" required="required" />
                <label htmlFor="#{label}">Username</label>
                <div className="bar" />
                </div>
                <div className="input-container_home">
                <input type="#{type}" id="#{label}" required="required" />
                <label htmlFor="#{label}">Password</label>
                <div className="bar" />
                </div>
                <div className="input-container_home">
                <input type="#{type}" id="#{label}" required="required" />
                <label htmlFor="#{label}">Repeat Password</label>
                <div className="bar" />
                </div>
                <div className="button-container_home">
                <button>
                    <span>Next</span>
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    )
}
export default Home;
import useWindowSize from "../hooks/use-windows";
import SpecialOrb from "./special-orb";

function createItems(offsetX) {
  let items = [];

  for(var i = 0; i < 5; i++) {
    var diameter = 50 + Math.floor(Math.random() * 250);
    var x = offsetX + 100 + Math.floor(Math.random() * (300 - diameter));
    var y = Math.floor(Math.random() * 200);
    var time = 30 + Math.floor(Math.random() * 30);
    items.push({
      index: i,
      diameter,
      x,
      y,
      time
    });
  }
  return items;
}


export default function SpecialOrbShower(props) {
  const sizes = useWindowSize();
  
  var itemsLeft = createItems(0);
  var itemsRight = createItems(3 * (sizes.width / 4));

  return (
    <div>
      <div
        style={{
          zIndex: "-1",
          overflow: "hidden",
          height: `${sizes.height}px`,
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0
        }}
      >
        {itemsLeft.map((item, index)=>{
            return <SpecialOrb key={index} diameter={item.diameter} x={item.x} y={item.y} time={item.time} />
        })}
        {itemsRight.map((item, index)=>{
            return <SpecialOrb key={index + 5} diameter={item.diameter} x={item.x} y={item.y} time={item.time} />
        })}
      </div>
    </div>
  )
}
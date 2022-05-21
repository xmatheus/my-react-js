import "./index.css";
import "./App.css";

function appendPropsInHTML($domElement, props) {
  Object.entries(props).map(([key, value]) => {
    console.log(key, value);
    if (key === "className") {
      $domElement.classList.add(value);
    } else if (key === "id") {
      $domElement.id = value;
    }
  });

  return $domElement;
}

function convertToHTML(virtualTree) {
  if (typeof virtualTree === "string" || typeof virtualTree === "number") {
    return document.createTextNode(`${virtualTree}`);
  }

  const $domElement = document.createElement(virtualTree.tagName);

  appendPropsInHTML($domElement, virtualTree.props);

  virtualTree.props.children.forEach((child) => {
    $domElement.appendChild(convertToHTML(child));
  });

  return $domElement;
}

function render(virtualTree, $domRoot) {
  const virtualDOM = convertToHTML(virtualTree);
  console.log(virtualDOM);
  $domRoot.appendChild(virtualDOM);
}

const React = {
  createElement: (element, props, ...children) => {
    if (typeof element === "function") {
      return element(props);
    }

    const virtualProps = {
      ...props,
      children,
    };

    return {
      tagName: element,
      props: virtualProps,
    };
  },
};

function Myapp() {
  return (
    <div>
      <p className="App" id="one">
        My Reactjs app
      </p>
    </div>
  );
}

render(React.createElement(Myapp, null), document.getElementById("root"));

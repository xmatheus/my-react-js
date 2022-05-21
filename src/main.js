import "./index.css";
import "./App.css";

function convertToHTML(virtualTree) {
  if (typeof virtualTree === "string" || typeof virtualTree === "number") {
    return document.createTextNode(`${virtualTree}`);
  }

  const $domElement = document.createElement(virtualTree.tagName);
  $domElement.classList.add(virtualTree.props.className);

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
  return React.createElement(
    "div",
    null,
    React.createElement(
      "header",
      null,
      React.createElement(
        "p",
        {
          className: "App",
        },
        "My React test!"
      )
    )
  );
}

render(React.createElement(Myapp, null), document.getElementById("root"));

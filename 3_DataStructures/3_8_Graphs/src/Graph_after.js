class Vertex {
  constructor(value, adjList = new Array()) {
    this.value = value;
    this.adjList = adjList;
  }
}

class Graph {
  constructor() {
    this.vertices = new Array(); // Graph { vertices: [] }
  }

  insert(value, adjList) {
    // insert(0, [])
    const vertex = new Vertex(value, adjList); // Vertex { value : 0, adjList : []}
    const newInd = this.vertices.length; // 0

    adjList.forEach((index) => {
      // vertex와 adjacency list를 연결해주는 작업
      this.vertices[index].adjList.push(newInd); // this.vertices []
    });
    this.vertices.push(vertex); // [ Vertex { value: 0, adjList: [] } ]
  }

  bfs(vertexInd) {
    // vertexInd : 트리와 달리 어디서부터 시작해야할지 입력을 받아야 함
    // vertexInd = 0
    // Uint8Array를 사용한 이유는 메모리를 적게 사용하기 위해서임. 만약 Array로 할거면 생성 후 0으로 채워줘야 함.
    // typed array로 아무거나 써도 됨. typed array로 할 경우 0이 알아서 채워짐
    const visited = new Uint8Array(this.vertices.length); // [ 0, 0, 0, 0, 0 ]
    const path = new Array(); // path는 굳이 지금 보지 않아도 됨
    const queue = new Array();
    queue.push(vertexInd); // [0]

    while (queue.length !== 0) {
      // queue.length = 1
      const vertInd = queue.shift(); // vertInd 0 (shift : 변경된 length값을 반환)

      if (visited[vertInd] === 0) {
        // visited에 속하지 않을 경우 아래 동작을 해줌
        path.push(vertInd); // path : [0]
        visited[vertInd] = 1; // visited : [1, 0, 0, 0, 0]
        console.log("this.vertices", this.vertices);
        this.vertices[vertInd].adjList.forEach((index) => {
          queue.push(index);
        });
      }
    }

    return path;
  }

  dfs(vertexInd) {
    const visited = new Uint8Array(this.vertices.length);
    const path = new Array();
    const vertices = this.vertices;

    function recursive(vertInd) {
      if (visited[vertInd] === 1) {
        return;
      }

      path.push(vertInd);
      visited[vertInd] = 1;

      vertices[vertInd].adjList.forEach((index) => {
        recursive(index);
      });
    }

    recursive(vertexInd); // 트리는 인자가 무조건 rootnode여야 하는데 그래프는 시작점을 따로 지정을 해줘야 함

    return path;
  }
}

const graph = new Graph(); // Graph { vertices: [] }
graph.insert(0, []); // Graph { vertices: [ Vertex { value: 0, adjList: [] } ] }
graph.insert(1, [0]);
// Graph {
// vertices: [
//   Vertex { value: 0, adjList: [Array] },
//   Vertex { value: 1, adjList: [Array] }
// ]
//   }
graph.insert(2, [1]);
graph.insert(3, [2]);
graph.insert(4, [0, 2, 3]);
console.log("graph", graph);

console.log(graph.bfs(0)); // [ 0, 1, 4, 2, 3 ]
console.log(graph.dfs(0)); // [ 0, 1, 2, 3, 4 ]

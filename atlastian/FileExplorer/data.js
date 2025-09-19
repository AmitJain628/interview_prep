export const data = {
    id: "0",
    name: "root",
    items: [
      {
        id: "1",
        name: "public",
        isFolder: true,
        items: [{ id: "2", name: "index.html", isFolder: false, items: [] }],
      },
      {
        id: "3",
        name: "src",
        isFolder: true,
        items: [
          {
            id: "4",
            name: "components",
            isFolder: true,
            items: [
              {
                name: "Accordion",
                isFolder: true,
                items: [{ name: "Accordion.jsx", isFolder: false, items: [] }],
              },
            ],
          },
          { id: "5", name: "index.js", isFolder: false, items: [] },
        ],
      },
      {
        id: "6",
        name: "package.json",
        isFolder: false,
        items: [],
      },
    ],
  };
  

  function buildTree(paths) {
    const root = [];
  
    for (const path of paths) {
      const parts = path.split("/");
      let currentLevel = root;
  
      parts.forEach((part, index) => {
        // Check if this part already exists at current level
        let existingNode = currentLevel.find((node) => node.name === part);
  
        if (!existingNode) {
          existingNode = {
            name: part,
            type: index === parts.length - 1 ? "file" : "folder",
            ...(index === parts.length - 1 ? {} : { children: [] }),
          };
          currentLevel.push(existingNode);
        }
  
        // Go deeper if it's a folder
        if (existingNode.type === "folder") {
          currentLevel = existingNode.children;
        }
      });
    }
  
    return root;
  }
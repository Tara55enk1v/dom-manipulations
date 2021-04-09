const data = [{
    'folder': true,
    'title': 'Pictures',
    'children': [{
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [{
          'title': 'spain.jpeg'
        }]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [{
      'folder': true,
      'title': 'screenshots',
      'children': null
    }]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [{
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

function createTree(container, arr) {
  container.append(createTreeDom(arr));
}

function createTreeDom(arr) {
  let ul = document.createElement('ul');
  for (let j = 0; j < arr.length; j++) {
    let li = document.createElement('li');
    let spanLi = document.createElement('span');
    let inputSpan = document.createElement('input');
    let folderClosed = document.createElement('i');
    let file = document.createElement('i');

    folderClosed.style.color = '#ECBB0B';
    folderClosed.classList.add('material-icons');
    folderClosed.innerText = 'folder';
    file.classList.add('material-icons');
    file.innerText = 'insert_drive_file';
    file.style.color = '#B0B0B0';
    if (arr[j].folder) {
      spanLi.prepend(folderClosed);
      spanLi.onclick = showFolderData;
    } else {
      spanLi.prepend(file);
    }
    spanLi.append(inputSpan);
    li.append(spanLi);
    inputSpan.value = arr[j].title;
    inputSpan.disabled = true;

    if (arr[j].folder) {
      let childrenUl = document.createElement('ul');
      for (let i = 0; i < arr[j].children.length; i++) {
        let childrenLi = document.createElement('li');
        let span = document.createElement('span');
        let input = document.createElement('input');
        let folderClosed = document.createElement('i');
        let file = document.createElement('i');

        childrenUl.style.display = 'none';
        folderClosed.classList.add('material-icons');
        folderClosed.innerText = 'folder';
        file.classList.add('material-icons');
        file.innerText = 'insert_drive_file';
        file.style.color = '#B0B0B0';
        folderClosed.style.color = '#ECBB0B';

        if (arr[j].children[i].folder) {
          span.prepend(folderClosed);
          span.onclick = showFolderData2;
        } else {
          span.prepend(file);
        }
        input.disabled = true;
        input.value = arr[j].children[i].title;
        span.append(input);
        childrenLi.append(span);
        childrenUl.append(childrenLi);

        if (arr[j].children[i].children && arr[j].children[i].children.length) {
          let childrenUl2 = document.createElement('ul');
          for (let k = 0; k < arr[j].children[i].children.length; k++) {
            let childrenLi2 = document.createElement('li');
            let span2 = document.createElement('span');
            let input2 = document.createElement('input');
            let file = document.createElement('i');

            childrenLi2.style.display = 'none';
            file.style.color = '#B0B0B0';
            input2.disabled = true;
            file.classList.add('material-icons');
            file.innerText = 'insert_drive_file';
            if (!arr[j].children[i].children[k].folder) {
              span2.prepend(file);
            }
            input2.value = arr[j].children[i].children[k].title;
            span2.append(input2);
            childrenLi2.append(span2);
            childrenUl2.append(childrenLi2);
            childrenUl.append(childrenUl2);
          }
        }
      }
      li.append(childrenUl);

    }
    ul.append(li);
  }

  return ul;
}

function showFolderData() {
  if (this.nextElementSibling.style.display === 'none') {
    this.nextElementSibling.style.display = 'block';
    this.firstChild.innerText = 'folder_open';
  } else {
    this.nextElementSibling.style.display = 'none';
    this.firstChild.innerText = 'folder';
  }
}

function showFolderData2() {
  if (this.parentNode.nextElementSibling && this.parentNode.previousElementSibling) {
    if (this.parentNode.nextElementSibling.firstChild.style.display === 'none') {
      this.parentNode.nextElementSibling.firstChild.style.display = 'block';
    } else {
      this.parentNode.nextElementSibling.firstChild.style.display = 'none';
    }
  }
  if (this.firstChild.innerText === 'folder') {
    this.firstChild.innerText = 'folder_open';
  } else {
    this.firstChild.innerText = 'folder';
  }
}

createTree(rootNode, data);
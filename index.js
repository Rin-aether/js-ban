const addButton = document.getElementById("add-button");

const onClickAdd = () => {
  //テキストボックスの値取得、初期化
  const inputText = document.getElementById("add-input-text").value;
  document.getElementById("add-input-text").value = "";

  //未完了リストに追加
  if (!inputText) return;
  createIncompleteTodo(inputText);
};

//未完了のTODOを作成する
const createIncompleteTodo = (todo) => {
  //li要素生成
  const li = document.createElement("li");

  //div要素生成
  const div = document.createElement("div");
  div.className = "todo-list";

  //p要素生成
  const p = document.createElement("p");
  p.className = "todo-item";
  p.innerText = todo;

  //完了ボタン追加
  const completeButton = document.createElement("button");
  completeButton.className = "btn btn-success btn-sm";
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //親のliタグを完了リストに移動 (完了と削除ボタンは除去)
    const moveTarget = completeButton.closest("li");
    completeButton.nextElementSibling.remove();
    completeButton.remove();

    //戻すボタンを生成・配下に追加
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    //戻すボタンの機能追加
    backButton.addEventListener("click", () => {
      //内容を取得して未完了リストに追加
      const todoText = backButton.previousElementSibling.innerText;
      createIncompleteTodo(todoText);
      //自分自身を削除
      backButton.closest("li").remove();
    });
    moveTarget.firstElementChild.appendChild(backButton);

    //移動 (参照を持っているので、追加するだけで追加された要素は移動する)
    document.getElementById("complete-list").appendChild(moveTarget);
  });

  //削除ボタン追加
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger btn-sm";
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //親のliタグを未完了リストから削除
    const deleteTarget = deleteButton.closest("li");
    document.getElementById("incomplete-list").removeChild(deleteTarget);
  });

  //階層構造
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  //ulタグにli要素追加
  document.getElementById("incomplete-list").appendChild(li);
};

addButton.addEventListener("click", onClickAdd);

const Item = ({ id, note, date, time, deleteData, submittingStatus }) => {

  function deteleItem() {
    submittingStatus.current = true
    deleteData(function (prev) {
      return prev.filter(item => item.id !== id)
    })
  }

  return <div className="item">
    <div>
      <p>{note}</p>
      <p>{`${date} ${time}`}</p>
    </div>
    <button className="remove" onClick={deteleItem}>刪除</button>
  </div>
}

export default Item
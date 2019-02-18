import React from 'react'
import Draggable from 'react-draggable'
import './index.css'
import { string, number, func, bool } from 'prop-types'

const DraggableCore = Draggable.DraggableCore

class Column extends React.Component {

  state = {
    list: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
    marginTop: 0,
    onStep: false,
    number: 0,
    prevOffset: 0,
    canSetNumber: true
  }

  dragStart = () => {
    return !this.props.isOpen;
  }

  dragStop = () => {
    this.setNumber();
  }

  setNumber = () => {
    const { checkMatch, id } = this.props;
    const { canSetNumber } = this.state;
    checkMatch(canSetNumber ? this.getNumber() : null, id);
  }

  listUpdate = (isUp) => {
    isUp ? this.updateUp() : this.updateDown();
    this.setInitialPos();
  }

  updateState(list) {
    this.setState({
      list: list,
      onStep: false,
      canSetNumber: true
    })
  }

  updateUp() {
    const { list } = this.state;
    list.unshift(list.pop());
    this.decNumber();
    this.updateState(list);
  }

  updateDown() {
    const { list } = this.state;
    list.push(list.shift());
    this.incNumber();
    this.updateState(list);
  }

  getNumber() {
    return this.state.number;
  }

  incNumber() {
    this.setState(state => ({ number: state.number === 9 ? 0 : state.number + 1 }))
  }

  decNumber() {
    this.setState(state => ({ number: state.number === 0 ? 9 : state.number - 1 }))
  }

  moveBack() {
    this.setState({ onStep: false, canSetNumber: true });
    this.setInitialPos();
  }

  dragAction = (e, data) => {
    const { height, isOpen } = this.props;
    if (isOpen) return false;
    const { onStep, prevOffset } = this.state;
    const step = height / 4;
    const offset = data.deltaY;
    const isContinue = prevOffset ? offset === prevOffset : true;
    const isUp = offset > 0;

    if (!(offset % step)) {
      this.setState(state => {
        const newMargin = isUp ? state.marginTop + step : state.marginTop - step;
        return {
          marginTop: newMargin,
          onStep: true,
          canSetNumber: false,
          prevOffset: offset
        }
      })
    }

    if(isContinue) {
      onStep && this.listUpdate(isUp);
    } else {
      this.moveBack();
    }
  }

  setInitialPos() {
    this.setState({ marginTop: -this.props.height * 1.75 })
  }

  componentDidMount() {
    this.setInitialPos();
    this.setNumber();
  }

  render() {
    const { height } = this.props;
    const { list, marginTop } = this.state;
    const cellSize = height / 2;
    const itemStyle = {
      fontSize: cellSize * 0.8 + 'px',
      height: cellSize + 'px',
      display: 'block'
    };
    const dragStyle = {
      height: height + 'px',
      display: 'inline-block',
      overflow: 'hidden'
    }
    const listStyle = {
      marginTop: marginTop + 'px',
      listStyle: 'none'
    }

    return (
      <div className='combination-lock-drag' style={dragStyle}>
        <DraggableCore
          grid={[cellSize, cellSize / 2]}
          onStart={this.dragStart}
          onDrag={this.dragAction}
          onStop={this.dragStop}
        >
          <ul style={listStyle}>
            {list.map((number, index) =>
              <li key={index} style={itemStyle}>{number}</li>
            )}
          </ul>
        </DraggableCore>
      </div>
    )
  }
}

class CombinationLock extends React.Component {

  state = {
    checker: [],
    opened: false
  }

  static defaultProps = {
    code: '01234',
    height: 80,
    onMatch: () => {},
    openText: ''
  }

  checkCode = (number, id) => {
    const { code, onMatch } = this.props;
    const codeNumbers = [...code].map((number) => +number);
    this.setState(state => {
      state.checker[id] = number;
      return {checker: state.checker}
    }, () => {
      (codeNumbers.length === this.state.checker.length) &&
      (codeNumbers.every((el, i) => el === this.state.checker[i]) ) &&
      this.setState({ opened: true }, onMatch());
    })
  }

  render() {
    const { code, onMatch, openText, height, ...props } = this.props;
    const { opened } = this.state;
    console.log(openText);
    return (
      <div className='combination-lock'>
        {opened && !!openText &&
          <div
            className={`combination-lock-open ${opened ? 'combination-lock-open--show' : ''}`}
            style={{position: 'absolute'}}
          >
            {openText}
          </div>
        }
        <div className='combination-lock-container' style={{ overflow: 'hidden', height: height }}>
          { [...code].map((v, i) =>
            <Column key={i} id={i} {...props} checkMatch={this.checkCode} isOpen={opened} height={height} />
          )}
        </div>
      </div>
    )
  }
}

Column.propTypes = {
  height: number,
  checkMatch: func,
  isOpen: bool,
  id: number
}

CombinationLock.propTypes = {
  code: string,
  height: number,
  onMatch: func,
  openText: string
}

export default CombinationLock;
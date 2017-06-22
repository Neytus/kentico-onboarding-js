import React, { Component } from 'react';
import assignment from './../../../assignment.gif';
import AddTextComponent from './AddTextComponent.jsx';
import TextNode from './TextNode.jsx';

import TsComponent from './TsComponent.tsx';

class List extends Component {
  render() {
    return (
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}
{/*        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>*/}
        <div className="row">
          <div className="col-sm-12">
{/*            <p className="lead text-center">Desired functionality is captured on the gif image. </p>
            <p className="lead text-center"><b>Note: </b>Try to make solution easily extensible (e.g. more displayed fields per item).</p>*/}
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <pre>
              // TODO: implement the list here :)
              <TextNode name="First" text="FirstComponent" />
              <TextNode name="Second" text="Second" />
              <AddTextComponent name="ADDER CLASS" />
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default List;

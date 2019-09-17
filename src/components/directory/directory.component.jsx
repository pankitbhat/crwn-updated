import React from "react";

import MenuItem from "../menu-item/menu-item.component";
import { connect } from "react-redux";
import { selectDirectorySections } from "../../redux/directory/directory.selector";
import { createStructuredSelector } from "reselect";
import { DirectoryMenuContainer } from "./directory.styles";

const Directory = ({ section }) => (
  <DirectoryMenuContainer>
    {section.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </DirectoryMenuContainer>
);

const mapStateToProps = createStructuredSelector({
  section: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);

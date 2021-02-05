import React from 'react';
import useGraphQL from '../../api/useGraphQL';
import { heroteaserByPath } from './query'
import './HeroTeaser.scss';
import Error from '../Error';
import Loading from '../Loading';



function Image(props) {
  if (!props.image) {
    return <></>;
  }

  return (
    <img className="heroteaser-item-image" src={props.image._path}
         alt={props.alt}/>
  );
}

function Title(props) {
  if (!props.title) {
    return <></>;
  }

  return <h2 className="title">{props.title}</h2>;
}

function Description(props) {
  if (!props.text.html) {
    return <></>;
  }

  function getHtml() {
    return {__html: props.text.html};
  }
  return <div className="text" dangerouslySetInnerHTML={getHtml()} />;
}

function HeroTeaser(props) {
  const query = heroteaserByPath(props.path);
  const { data, errorMessage } = useGraphQL(query);

  if (errorMessage) return <Error errorMessage={errorMessage} />;

  if (!data) return <Loading />;

  const item = data.heroteaserByPath.item

  return (
    <div className="HeroTeaser">
      <Image image={item.image} alt={item.title} />
      <div className="HeroTeaser__content">
        <Title title={item.title} />
        <Description text={item.description} />
      </div>
    </div>
  );
}

export default HeroTeaser;

import AlbumGridStyles from '../styles/AlbumGrid.module.scss';

export const AlbumGrid = ({ albums }: { albums: any[] }) => {
  return (
    <div className={AlbumGridStyles.AlbumGrid}>
      {albums.map((album) => {
        return <img key={album.key} src={album.album.images[1].url} />;
      })}
    </div>
  );
};

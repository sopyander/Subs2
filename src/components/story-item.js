  class StoryItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    set data(d) {
      this._data = d;
      this.render();
    }

    get data() {
      return this._data;
    }

    render() {
      const d = this._data || {};

      this.shadowRoot.innerHTML = `
        <style>
          .card {
            background: white;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            transition: box-shadow 0.2s;
          }

          .card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 6px;
            background-color: #eee;
          }

          h3 {
            margin: 8px 0 6px;
            font-size: 1.1rem;
            color: #333;
          }

          p {
            margin: 0;
            font-size: 0.9rem;
            color: #666;
          }

          small {
            display: block;
            margin-top: 10px;
            font-size: 0.8rem;
            color: #888;
          }
        </style>

        <article class="card" role="article" aria-labelledby="t">
          ${
            d.photoUrl
              ? `<img src="${d.photoUrl}" alt="Gambar cerita oleh ${d.name || 'Anonim'}" />`
              : ''
          }
          <h3 id="t">${d.name || 'Anonim'}</h3>
          <p>${d.description || ''}</p>
          <small>${new Date(d.createdAt).toLocaleString('id-ID')}</small>
        </article>
      `;
    }
  }

  customElements.define('story-item', StoryItem);
  export default StoryItem;

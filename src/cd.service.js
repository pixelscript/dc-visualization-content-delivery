import wretch from 'wretch';

export class CDService {

  constructor({vse, depth, format, locale, id}) {
    this.id = id;
    this.depth = depth;
    this.format = format;
    this.locale = locale;
    this.deliveryBase = `https://${vse}/content/id/`;
  }

  constructFullPath() {
    let url =  `${this.deliveryBase}${this.id}?depth=${this.depth}&format=${this.format}`;
    if(this.locale) {
      url = `${url}&locale=${this.locale}`;
    }
    return url;
  }

  setParams({format, depth}){
    this.format = format;
    this.depth = depth;
  }

  async fetchContent() {
    let content = await wretch(this.constructFullPath(this.id)).get().json();
    return content;
  }
}
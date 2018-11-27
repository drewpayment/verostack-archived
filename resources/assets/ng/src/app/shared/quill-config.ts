

export class QuillConfig {

    static readonly DEFAULT_MODULE:any = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],  // toggled buttons
            [{ 'font': [] }],
            [{ 'color': [], 'background': [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // headings
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // lists
            [{ 'align': [] }],
            ['blockquote'],
            [{ 'indent': '-1'}, { 'indent': '+1' }], // indentations
            ['link', 'image'] // media
        ]
    }

}
const Alpinify = {
    init() {
        let nodes = document.querySelectorAll('*');
        for (let i = nodes.length - 1; i >= 0; i--) {
            const node = nodes[i];

            if (node.classList.contains('w-embed')) {
                node.outerHTML = node.innerHTML;
            } else {
                const attrs = node.attributes;
                let template = false;
                if (node.hasAttribute('x-for') || node.hasAttribute('x-if')) template = document.createElement('template');
                for (let a = 0; a < attrs.length; a++) {
                    const attr = attrs[a];
                    if (attr) {
                        const name = attr.name;
                        const value = attr.value;

                        // x-bind:src
                        if (name == 'x-bind:src') node.removeAttribute('srcset');

                        // x-for, x-key, x-if
                        if (name == 'x-for' || name == 'x-key' || name == 'x-if')
                            template.setAttribute(name == "x-key" ? ":key" : name, value);

                        // x-show, x-on, x-model
                        if (name.startsWith('x-show') || name.startsWith('x-on') || name.startsWith('x-model')) {
                            const newName = name.replaceAll('_', '.');
                            if (newName != name) {
                                node.removeAttribute(name);
                                node.setAttribute(newName, value);
                            }
                        }
                    }
                }
                if (template) {
                    const attrs = ['x-for', 'x-key', 'x-if'];
                    for (let i = 0; i < attrs.length; i++) node.removeAttribute(attrs[i]);
                    template.innerHTML = node.outerHTML;
                    node.replaceWith(template);
                }
            }
        }
    }
}
import md5 from 'md5'

/**
 * 
 * @param {String} email 
 * @param {Object} options 
 * @returns 
 */
export function gravatar(email, options = {}){
    options = Object.assign({
        s: 80,
        d: 'mp'
    }, options)

    return `https://www.gravatar.com/${md5(email.toLowerCase())}?${new URLSearchParams(options).toString()}`;
}
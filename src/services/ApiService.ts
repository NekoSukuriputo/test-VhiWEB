import { api } from 'src/boot/axios'
import { AxiosResponse, AxiosRequestConfig } from 'axios'

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static async get (
    resource: string,
    slug = '' as string,
    param = '' as string
  ): Promise<AxiosResponse> {
    param = param ? `?${param}` : ''
    let url = `${resource}/${slug}${param}`
    // eslint-disable-next-line eqeqeq
    if (url[url.length - 1] == '/') {
      url = url.substring(0, url.length - 1)
    }
    return api.get(url, { timeout: 0 })
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static async post (
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    // await ApiService.setHeader()
    return api.post(`${resource}`, params)
  }
}

export default ApiService

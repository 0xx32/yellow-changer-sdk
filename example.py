import hashlib
import hmac
import json
from typing import Union
import requests
from .exceptions import BadRequest


class YellowChanger():
    def __init__(self, public_api_key: str, secret_api_key: str, base_url: Union[None, str] = None):
        """
        All you need to pass only public_api_key and secret_api_key

        :param public_api_key: Public API Key obtained from https://yellowchanger.com/auth/register
        :param secret_api_key: Secret API Key obtained from https://yellowchanger.com/auth/register
        :param base_url: BaseURL of API, if domain will be changed
        """
        self.public_api_key = public_api_key
        self.secret_api_key = secret_api_key
        self.base_headers = {
            'Content-Type': 'application/json',
            'Y_API_KEY': self.public_api_key
        }
        if not base_url:
            self.base_url = 'https://api.yellowchanger.com/'

    def __create_hmac_sha256(self, body: dict):
        """
        Method for generation signature of request.
        Copied form https://docs.yellowchanger.com/signature

        :param body: Body of request to make a signature
        """
        message = json.dumps(body, separators=(',', ':'))
        hmac_instance = hmac.new(self.secret_api_key.encode(), message.encode(), hashlib.sha256)
        hmac_digest = hmac_instance.hexdigest()
        return hmac_digest

    def __fetch(self, method: str, path: str, body: dict = None) -> requests.Response:
        """
        Base request method.
        If request has body, we add signature to request

        :param method: 'GET' or 'POST'
        :param path: path to endpoint
        :param body: body of request
        :return: requests.Response
        """
        headers = self.base_headers.copy()
        url = self.base_url + path

        try:
            if method.upper() == 'POST':
                if body is None:
                    raise ValueError(f'Body of POST request is empty!')

                signature = self.__create_hmac_sha256(body)
                headers['Signature'] = signature
                response = requests.post(url, headers=headers, json=body)

            elif method.upper() == 'GET':
                if body:
                    signature = self.__create_hmac_sha256(body)
                    headers['Signature'] = signature
                response = requests.get(url, headers=headers, json=body)

            else:
                raise ValueError(f"Unsupported HTTP method: {method}")

        except requests.exceptions.HTTPError as http_err:
            raise BadRequest(f"HTTP error occurred: {http_err}")

        except Exception as err:
            raise BadRequest(f"An error occurred: {err}")

        if not str(response.status_code).startswith('20'):
            raise BadRequest(f'Http status code {response.status_code}: {response.text}')

        return response

    def all_rates(self):
        """
        Gets all rates

        https://docs.yellowchanger.com/methods/allrates
        :return: json
        """
        response = self.__fetch('GET', 'trades/allRates')
        return response.json()

    def destinations_list(self):
        """
        Gets all destinations list

        https://docs.yellowchanger.com/methods/destinationslist

        :return:
        """
        response = self.__fetch('GET', 'trades/destinationsList')
        return response.json()

    def rates_in_direction(self, direction):
        """
        Gets all rates in specific direction

        https://docs.yellowchanger.com/methods/ratesindirection

        :param direction: direction of rate, for example: 'USDT'
        :return: json
        """
        body = {"direction": direction}
        response = self.__fetch('GET', 'trades/ratesInDirection', body)
        return response.json()

    def get_info(self, uniq_id):
        """
        Gets information about trade by uniq_id of trade

        https://docs.yellowchanger.com/methods/tradestatus

        :param uniq_id: uniq_id of trade
        :return: json
        """
        body = {"uniq_id": uniq_id}
        response = self.__fetch('GET', 'trades/getInfo', body)
        return response.json()

    def create_trade(self, **kwargs):
        """
        Creates trade from kwargs.

        Example of usage:
        trade = yellow_changer.create_trade(
            send_name='USDT',
            get_name='USDT',
            send_value=100,
            send_network='TRC20',
            get_network='ERC20',
            get_creds='0x4c...'
        )

        https://docs.yellowchanger.com/methods/createtrade

        :param kwargs: named parameters
        :return:
        """
        body = kwargs
        body = {key: value for key, value in body.items() if value is not None}
        print(body)
        response = self.__fetch("POST", 'trades/createTrade', body)
        return response.json()
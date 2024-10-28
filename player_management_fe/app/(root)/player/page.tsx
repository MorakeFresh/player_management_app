import {buildSearchParamString, deletePlayer, getAllPlayers} from "@/lib/actions";
import {Player} from "@/lib/models/player";
import Table from "@/components/table/table";
import {PlayerColumns} from "@/components/table/columns/player-column";
import {redirect} from "next/navigation";

type PlayerListPageProps = {
    searchParams: { [key: string]: string | string[] | undefined };
}
export default async function PlayerListPage({searchParams}: PlayerListPageProps) {
    if (!searchParams['offset'] || !searchParams['limit']) {
        initialPageParams(searchParams);
    }

    const parsedOffset = parseInt(searchParams['offset'] as string);
    const parsedLimit = parseInt(searchParams['limit'] as string);

    async function getData() {
        const data = await getAllPlayers(parsedOffset, parsedLimit);
        return data.data as Player[] ?? [];
    }

    async function viewClick(item: Record<string, any>) {
        'use server'
        redirect(`/player/${item.id}`);
    }

    async function deleteClick(item: Record<string, any>) {
        'use server'
        await deletePlayer(item.id);
        redirect(`/player?offset=${parsedOffset}&limit=${parsedLimit}`);
    }


    return (
        <div>
            <div className="mt-4">
                <Table
                    columns={PlayerColumns}
                    data={[]}
                    title="Player List"
                    onViewButtonClick={viewClick}
                    onDeleteButtonClick={deleteClick}
                    getData={getData}
                />
            </div>
        </div>
    );

    function initialPageParams(
        searchParams: { [key: string]: string | string[] | undefined }
    ) {
        if (!searchParams['offset']) {
            searchParams['offset'] = '0';
        }
        if (!searchParams['limit']) {
            searchParams['limit'] = '10';
        }
        redirect(`/player/${buildSearchParamString(searchParams)}`);
    }
}
